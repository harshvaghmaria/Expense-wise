import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to ExpenseWise</CardTitle>
          <CardDescription>Track and manage your expenses with ease.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Get started by creating a group or adding an expense.</p>
        </CardContent>
      </Card>
    </div>
  );
}

