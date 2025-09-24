import PageHeader from "@/components/page-header/page-header";
import { CategoryDistributionPieChart } from "./category-distribution-pie-chart";
import MainContentWrapper from "@/components/main-content-wrapper";

export default async function Page() {
  return (
    <>
      <PageHeader title="Dashboard" desc="View your key insight" />
      <MainContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CategoryDistributionPieChart />
        </div>
      </MainContentWrapper>
    </>
  );
}
