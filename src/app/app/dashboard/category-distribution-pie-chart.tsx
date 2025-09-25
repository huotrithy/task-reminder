"use client";

import { Pie, PieChart, Sector } from "recharts";
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
import { generateColorFromString } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { ErrorDisplay } from "@/components/error-display";

export const description = "A pie chart with a label list";

export function CategoryDistributionPieChart() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["numTasksByCategory"],
    queryFn: () => fetchTasksByCategory(),
  });

  // filter out empty categories
  const chartDataRaw = useMemo(() => {
    return data?.serializedResult?.filter((d) => d.tasksCount > 0) ?? [];
  }, [data]);

  const totalTasks = useMemo(() => {
    return chartDataRaw.reduce((acc, d) => acc + d.tasksCount, 0);
  }, [chartDataRaw]);

  const [activeCategory, setActiveCategory] = useState(
    chartDataRaw.length > 0 ? chartDataRaw[0].categoryName : undefined
  );
  const activeIndex = useMemo(
    () =>
      chartDataRaw.findIndex((item) => item.categoryName === activeCategory),
    [activeCategory, chartDataRaw]
  );

  const chartData = useMemo(() => {
    return chartDataRaw.map((d) => ({
      category: d.categoryName,
      numTask: d.tasksCount,
      fill: generateColorFromString(d.categoryName),
    }));
  }, [chartDataRaw]);

  const chartConfig = useMemo(() => {
    return {
      tasks: {
        label: "Tasks",
      },
      ...chartData.reduce((acc, d) => {
        acc[d.category] = { label: d.category, color: d.fill };
        return acc;
      }, {} as ChartConfig),
    } satisfies ChartConfig;
  }, [chartData]);

  return (
    <Card className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-gray-300">
      <CardHeader className="flex-row items-start space-y-0 pb-0 px-2">
        <div className="flex flex-col gap-1.5">
          <CardTitle>Tasks by Category</CardTitle>
          <CardDescription>
            You have a total of {totalTasks} tasks.
          </CardDescription>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-3/5 md:w-2/5 rounded-lg pl-2.5"
            aria-label="Select a category"
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {chartData.map((d, idx) => {
              const config =
                chartConfig[d.category as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={idx}
                  value={d.category}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex  items-center gap-2 text-xs">
                    <span
                      className="flex  h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: `${d.fill}`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-4 px-2 flex items-center justify-center">
        {isLoading && <Spinner variant="ellipsis" />}

        {isError && <ErrorDisplay errorMsg={error.message} />}

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
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 5} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 12}
                      innerRadius={outerRadius + 6}
                    />
                  </g>
                )}
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
                      {payload.numTask}
                    </text>
                  );
                }}
              ></Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
