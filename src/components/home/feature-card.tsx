import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface props {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export function FeatureCard({ icon, title, desc }: props) {
  return (
    <Card>
      <CardHeader>
        {icon}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
    </Card>
  );
}
