import React from "react";
import {
    Search,
    Filter,
    Download,
    CreditCard,
    MoreHorizontal,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const PaymentsPage = () => {
    const payments = [
        { id: "INV-001", student: "Alex Johnson", amount: "$750.00", date: "Mar 01, 2025", status: "paid", method: "Credit Card" },
        { id: "INV-002", student: "Samantha Lee", amount: "$750.00", date: "Mar 01, 2025", status: "paid", method: "Bank Transfer" },
        { id: "INV-003", student: "David Martinez", amount: "$750.00", date: "Mar 01, 2025", status: "pending", method: "Pending" },
        { id: "INV-004", student: "Emily Wilson", amount: "$750.00", date: "Feb 28, 2025", status: "overdue", method: "Pending" },
        { id: "INV-005", student: "Michael Brown", amount: "$750.00", date: "Feb 28, 2025", status: "paid", method: "PayPal" },
        { id: "INV-006", student: "Olivia Davis", amount: "$750.00", date: "Feb 27, 2025", status: "paid", method: "Credit Card" },
        { id: "INV-007", student: "John Smith", amount: "$750.00", date: "Feb 27, 2025", status: "overdue", method: "Pending" },
        { id: "INV-008", student: "Emma Thomas", amount: "$750.00", date: "Feb 26, 2025", status: "pending", method: "Pending" },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "overdue":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    return (

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Payments</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button size="sm">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Send Invoice
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                <div className="text-2xl font-bold">$187,429.00</div>
                                <Badge className="ml-2 bg-green-100 text-green-800" variant="outline">
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                    8.2%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$12,580.00</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$5,723.00</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Payment Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">92%</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <Tabs defaultValue="all">
                        <div className="p-4 border-b">
                            <div className="flex justify-between items-center mb-4">
                                <TabsList>
                                    <TabsTrigger value="all">All Payments</TabsTrigger>
                                    <TabsTrigger value="paid">Paid</TabsTrigger>
                                    <TabsTrigger value="pending">Pending</TabsTrigger>
                                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
                                </TabsList>
                                <div className="flex gap-2">
                                    <div className="relative w-64">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search payments..." className="pl-8" />
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <TabsContent value="all" className="m-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice ID</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Payment Method</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell className="font-medium">{payment.id}</TableCell>
                                            <TableCell>{payment.student}</TableCell>
                                            <TableCell>{payment.amount}</TableCell>
                                            <TableCell>{payment.date}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(payment.status)} variant="outline">
                                                    {payment.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{payment.method}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Invoice</DropdownMenuItem>
                                                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                        <TabsContent value="paid" className="m-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice ID</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Payment Method</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.filter(p => p.status === 'paid').map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell className="font-medium">{payment.id}</TableCell>
                                            <TableCell>{payment.student}</TableCell>
                                            <TableCell>{payment.amount}</TableCell>
                                            <TableCell>{payment.date}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(payment.status)} variant="outline">
                                                    {payment.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{payment.method}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Invoice</DropdownMenuItem>
                                                        <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                        {/* Other tabs would follow the same pattern */}
                    </Tabs>
                </div>
            </div>

    );
};

export default PaymentsPage;