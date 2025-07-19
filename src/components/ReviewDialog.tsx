"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./commons/Dialog";
import { Button } from "./commons/Button";
import { RestaurantSelect } from "./RestaurantSelect";
import { RestaurantModel } from "@/models/RestaurantModel";
import Image from "next/image";
import { Textarea } from "./commons/Textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Rating } from "./commons/Rating";
import { useCreateReview } from "@/hooks/mutations/useCreateReview";
import { Rate } from "@/models/ReviewModel";
import { Loader } from "./commons/Loader";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDate } from "@/hooks/useDate";
import { isDate } from "lodash";
import { DATA_FORMATS } from "@/constants/dateFormats";
import { add } from "date-fns";
import { CitySelect } from "./CitySelect";

const STEPS = {
  ADD_RESTAURANT: "Adicione um restaurante",
  REVIEW: "Faça sua crítica",
};

export const ReviewDialog: FC = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(STEPS.ADD_RESTAURANT);
  const [restaurant, setRestaurant] = useState<RestaurantModel | null>(null);

  const date = useDate();

  const formSchema = z.object({
    content: z.string(),
    rating: z.number(),
    visited_at: z.date().max(add(new Date(), { days: 1 }), "Data inválida"),
    city: z.object({
      id: z.string(),
      name: z.string(),
      state: z.string(),
      created_at: z.string(),
    }),
  });

  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({
    defaultValues: {
      content: "",
      rating: 0,
      visited_at: new Date(),
      city: null as unknown as z.infer<typeof formSchema>["city"],
    },
    resolver: zodResolver(formSchema),
  });

  const reset = () => {
    setRestaurant(null);
    setStep(STEPS.ADD_RESTAURANT);
    setOpen(false);
    resetForm();
  };

  const { mutate: createReview, isPending: createReviewIsPending } =
    useCreateReview({
      onSuccess: () => {
        toast.success("Crítica criada com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["list-reviews"] });
        reset();
      },
    });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createReview({
      content: JSON.stringify(data.content),
      rating: data.rating as Rate,
      restaurant_id: restaurant?.id ?? "",
      visited_at: data.visited_at,
      city_id: data.city.id,
    });
  };

  const getStep = () => {
    if (step === STEPS.ADD_RESTAURANT) {
      return (
        <DialogContent>
          <DialogTitle>{step}</DialogTitle>
          <div className="p-4 py-8">
            <RestaurantSelect
              selected={restaurant}
              onChange={(r) => {
                setRestaurant(r);
                setStep(STEPS.REVIEW);
              }}
            />
          </div>
        </DialogContent>
      );
    }
    if (step === STEPS.REVIEW) {
      return (
        <DialogContent className="sm:max-w-[800px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>{step}</DialogTitle>
            <div className="p-4 flex justify-between gap-6">
              <div>
                <Image
                  src={restaurant?.avatar_url ?? ""}
                  alt={restaurant?.name ?? ""}
                  width={150}
                  height={150}
                  className="border"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{restaurant?.name}</span>
                  <span
                    className="text-zinc-400 text-xs line-clamp-2"
                    title={restaurant?.description}
                  >
                    {restaurant?.description}
                  </span>
                </div>
                <div className="flex gap-1">
                  <span data-error={errors.visited_at?.message}>
                    Visitado em
                  </span>
                  <Controller
                    control={control}
                    name="visited_at"
                    render={({ field: { value, onChange } }) => {
                      return (
                        <input
                          type="date"
                          value={
                            isDate(value)
                              ? date(value).format(DATA_FORMATS.YEAR_MONTH_DAY)
                              : ""
                          }
                          onChange={(evt) => {
                            if (evt.target.value) {
                              onChange(
                                date(
                                  evt.target.value,
                                  DATA_FORMATS.YEAR_MONTH_DAY
                                ).toDate()
                              );
                            }
                          }}
                        />
                      );
                    }}
                  />
                </div>

                <Controller
                  control={control}
                  name="rating"
                  render={({ field: { value, onChange } }) => (
                    <Rating rating={value} onChange={onChange} />
                  )}
                />

                <Textarea
                  placeholder="Escreva sua crítica"
                  className="h-96"
                  {...register("content")}
                />

                <Controller
                  control={control}
                  name="city"
                  render={({ field: { value, onChange } }) => (
                    <CitySelect selected={value} onChange={onChange} />
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outlined" onClick={reset}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={createReviewIsPending}>
                {createReviewIsPending ? <Loader /> : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <span className="font-bold">+</span>
          Adicionar nova Crítica
        </Button>
      </DialogTrigger>

      {getStep()}
    </Dialog>
  );
};
