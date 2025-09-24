"use client";

import { RefreshCw } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { fetchTasksByCategory } from "./data";
import { generateColorFromString } from "@/lib/client-utils";
import { Button } from "@/components/ui/button";

export const description = "A pie chart with a label list";

export function CategoryDistributionPieChart() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["numTasksByCategory"],
    queryFn: () => fetchTasksByCategory(),
  });

  // filter out empty categories
  const chartDataRaw =
    data?.serializedResult?.filter((d) => d.tasksCount > 0) ?? [];

  const totalTasks = chartDataRaw.reduce((acc, d) => acc + d.tasksCount, 0);

  const chartData = chartDataRaw.map((d) => ({
    category: d.categoryName,
    numTask: d.tasksCount,
    fill: generateColorFromString(d.categoryName),
  }));

  const chartConfig = {
    tasks: {
      label: "Tasks",
    },
    ...chartData.reduce((acc, d) => {
      acc[d.category] = { label: d.category, color: d.fill };
      return acc;
    }, {} as ChartConfig),
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-gray-300">
      <CardHeader className="items-center pb-0">
        <CardTitle>Your number of Tasks by each Category</CardTitle>
        <CardDescription>Total number of task {totalTasks}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4 flex items-center justify-center">
        {isLoading && (
          <div className="text-muted-foreground animate-pulse">
            Loading chart…
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-red-500">
              Failed to load data: {error instanceof Error ? error.message : ""}
            </span>
            <Button onClick={() => refetch()} size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" /> Retry
            </Button>
          </div>
        )}

        {!isLoading && !isError && chartData.length === 0 && (
          <div className="text-muted-foreground">
            No tasks found for any category.
          </div>
        )}

        {!isLoading && !isError && chartData.length > 0 && (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px] w-full"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="numTask" hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="numTask"
                nameKey="category"
                labelLine={false}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="hsla(var(--foreground))"
                    >
                      {payload.numTask} {payload.category}
                    </text>
                  );
                }}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
