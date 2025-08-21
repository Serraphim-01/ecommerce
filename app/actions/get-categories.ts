"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore as noStore } from 'next/cache';

import { Category } from "@/types";

export const getCategories = async (): Promise<Category[]> => {
  noStore();
  const { data: categories, error } = await supabaseServer
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return categories as Category[];
};
