"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskDeadlineProximity } from "./data";
import { useMemo, useState } from "react";
import { generateColorFromString } from "@/lib/utils";
import { DeadlineTaskListModal } from "./deadline-task-list-modal";
import { TaskProps } from "@/shared/types/task-props";
import { DEADLINE_PROXIMITY_OBJECT } from "@/shared/const";
import { ErrorDisplay } from "@/components/error-display";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export function TaskDeadlineProximityBarChart() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["taskDeadlineProximity"],
    queryFn: () => fetchTaskDeadlineProximity(),
  });

  const dataRaw = useMemo(() => {
    return data?.serializedResult;
  }, [data]);
  console.log(data);

  const chartData = useMemo(() => {
    const data = dataRaw;

    if (!data || data.length === 0) {
      return [];
    }

    const validTypes = Object.values(DEADLINE_PROXIMITY_OBJECT);

    const allTypesAreValid = data.every((item) => {
      return validTypes.includes(item.type);
    });

    if (!allTypesAreValid) {
      return [];
    }

    return data;
  }, [dataRaw]);

  const categoryKeys = useMemo(() => {
    if (chartData && chartData.length > 1) {
      return Object.keys(chartData[0]).filter((k) => k !== "type");
    }
    return [];
  }, [chartData]);

  const [openList, setOpenList] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [acitveDeadlineTask, setAcitveDeadlineTask] = useState<TaskProps[]>();

  function handleOpenList(type: string) {
    const key = Object.keys(DEADLINE_PROXIMITY_OBJECT).find(
      (key) =>
        DEADLINE_PROXIMITY_OBJECT[
          key as keyof typeof DEADLINE_PROXIMITY_OBJECT
        ] === type
    );

    if (key && data?.rawResult) {
      setListTitle(`Deadline - ${type}`);
      setAcitveDeadlineTask(data.rawResult[key as keyof typeof data.rawResult]);
      setOpenList(true);
    }
  }

  return (
    <>
      <Card className="rounded-xl border border-gray-200 bg-white px-2 shadow-sm transition-all hover:shadow-md hover:border-gray-300">
        <CardHeader>
          <CardTitle>Task Deadlines</CardTitle>
          <CardDescription>
            A breakdown of tasks by deadline. Double-click a bar for details.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          {isLoading && <Spinner variant="ellipsis" />}

          {isError && <ErrorDisplay errorMsg={error.message} />}

          {!isLoading && !isError && chartData && chartData.length === 0 && (
            <div className="text-muted-foreground">No data found.</div>
          )}
          <ChartContainer config={{}} className="overflow-x-auto">
            <BarChart width={600} height={300} data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="type" tickLine={false} axisLine={false} />

              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />

              {categoryKeys.map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={generateColorFromString(key)}
                  radius={[4, 4, 0, 0]}
                  onDoubleClick={(data, index) => {
                    if (!chartData) {
                      return;
                    }
                    const type = chartData[index].type;
                    handleOpenList(type);
                  }}
                >
                  <LabelList
                    dataKey={key}
                    position="center"
                    formatter={(value: number) => (value > 0 ? value : "")}
                    className="fill-foreground text-xs"
                  />
                </Bar>
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <DeadlineTaskListModal
        title={listTitle}
        open={openList}
        setOpen={setOpenList}
        tasks={acitveDeadlineTask}
      />
    </>
  );
}
