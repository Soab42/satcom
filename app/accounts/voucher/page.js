import { redirect } from "next/navigation";
import React from "react";

export default function AddVoucher() {
  redirect("/accounts/voucher/receipt");
}
