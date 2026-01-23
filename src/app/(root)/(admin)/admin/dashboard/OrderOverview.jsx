"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

export const description = "A bar chart";

const chartData = [
  { month: "January", amount: 186 },
  { month: "February", amount: 305 },
  { month: "March", amount: 237 },
  { month: "April", amount: 73 },
  { month: "May", amount: 209 },
  { month: "June", amount: 214 },
  { month: "July", amount: 24 },
  { month: "August", amount: 514 },
  { month: "September", amount: 264 },
  { month: "October", amount: 454 },
  { month: "November", amount: 654 },
  { month: "December", amount: 114 },
];

const chartConfig = {
  desktop: {
    label: "Amount",
    color: "#F69E8B",
  },
};

export function OrderOverview() {

  const [chartData, setChartData] = useState([]);
  const {data: monthlySales, loading} = useFetch('/api/dashboard/admin/monthly-sales');

  // console.log("monthly Sales", monthlySales.data)

  useEffect(() => {
    if(monthlySales && monthlySales.sucess){
      console.log("monthly Sales", monthlySales.data)
    }
  }, [monthlySales]);

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent />}
        />
        <Bar dataKey="amount" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
