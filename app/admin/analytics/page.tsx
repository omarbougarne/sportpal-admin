import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Page Views</CardTitle>
                <CardDescription>Total page views across all pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234,567</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                <div className="mt-4 h-[120px] bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
                  Chart placeholder
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Unique Visitors</CardTitle>
                <CardDescription>Total unique visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456,789</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                <div className="mt-4 h-[120px] bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
                  Chart placeholder
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Bounce Rate</CardTitle>
                <CardDescription>Average bounce rate across all pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.5%</div>
                <p className="text-xs text-muted-foreground">-2.3% from last month</p>
                <div className="mt-4 h-[120px] bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
                  Chart placeholder
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Detailed traffic analytics for your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
                Large chart placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
                Traffic sources chart placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rates</CardTitle>
              <CardDescription>How well your site converts visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
                Conversion chart placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

