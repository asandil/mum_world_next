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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const chartConfig = {
  desktop: {
    label: "Amount",
    color: "#F69E8B",
  },
};

export function OrderOverview() {
  const [chartData, setChartData] = useState([]);
  const { data: monthlySales, loading } = useFetch(
    "/api/dashboard/admin/monthly-sales",
  );

  useEffect(() => {
    if (monthlySales && monthlySales.success) {
      console.log("monthly Sales", monthlySales?.data);
      const getChartData = months.map((month, index) => {
        const monthData = monthlySales?.data.find(
          (item) => item?._id?.month === index + 1,
        );
        return {
          month: month,
          amount: monthData?.totalSales ?? 0,
          orderCount: monthData?.orderCount ?? 0,
        };
      });
      setChartData(getChartData);
    }
  }, [monthlySales]);

  const CustomTooltipContent = (props) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {label}
              </span>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-4 justify-between">
                  <span className="text-sm font-medium">
                    Total Sales Amount
                  </span>
                  <span className="font-bold tabular-nums text-foreground">
                    {data.amount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-4 justify-between">
                  <span className="text-sm font-medium">Total Order</span>
                  <span className="font-bold tabular-nums text-foreground">
                    {data.orderCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

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
        <ChartTooltip cursor={true} content={<CustomTooltipContent />} />
        <Bar dataKey="amount" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
