// app/admin/subscriptions/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  Users,
  CreditCard,
  BarChart3,
  RefreshCw,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Crown,
  Zap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subscriptionsRes, plansRes, statsRes] = await Promise.all([
        fetch("http://localhost:5000/api/v1/subscription/admin/all"),
        fetch("http://localhost:5000/api/v1/subscription/admin/plans"),
        fetch("http://localhost:5000/api/v1/subscription/admin/stats"),
      ]);

      if (subscriptionsRes.ok) {
        const data = await subscriptionsRes.json();
        console.log(data);
        setSubscriptions(data.subscriptions || []);
      }

      if (plansRes.ok) {
        const data = await plansRes.json();
        console.log(data);
        setPlans(data.plans || []);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        console.log(data);
        setStats(data.stats || {});
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubscription = async (subscriptionId, updates) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/subscription/admin/subscription/${subscriptionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Subscription updated successfully",
        });
        fetchData();
      } else {
        throw new Error("Failed to update subscription");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleResetUsage = async (subscriptionId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/subscription/admin/reset-usage/${subscriptionId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Usage reset successfully",
        });
        fetchData();
      } else {
        throw new Error("Failed to reset usage");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreatePlan = async (planData) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/subscription/admin/plans",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(planData),
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Plan created successfully",
        });
        fetchData();
      } else {
        throw new Error("Failed to create plan");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdatePlan = async (planId, updates) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/subscription/admin/plans/${planId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Plan updated successfully",
        });
        fetchData();
      } else {
        throw new Error("Failed to update plan");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/subscription/admin/plans/${planId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Plan deleted successfully",
        });
        fetchData();
      } else {
        throw new Error("Failed to delete plan");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPlanIcon = (planName) => {
    switch (planName?.toLowerCase()) {
      case "pro":
        return <Zap className="h-4 w-4 text-blue-400" />;
      case "premium":
        return <Crown className="h-4 w-4 text-amber-400" />;
      default:
        return <Sparkles className="h-4 w-4 text-emerald-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: "bg-emerald-500/20 text-emerald-400",
      canceled: "bg-gray-500/20 text-gray-400",
      expired: "bg-rose-500/20 text-rose-400",
      past_due: "bg-amber-500/20 text-amber-400",
    };
    return (
      <Badge className={variants[status] || "bg-gray-500/20"}>{status}</Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="h-64 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Subscription Management
            </h1>
            <p className="text-gray-400 mt-2">
              Manage user subscriptions and plans
            </p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            New Plan
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Subscriptions</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalSubscriptions || 0}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Subscriptions</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.activeSubscriptions || 0}
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <CreditCard className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">
                    ${stats.monthlyRevenue || 0}
                  </p>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Plans</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalPlans || 0}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Crown className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search subscriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="past_due">Past Due</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-400"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/50">
                  <TableHead className="text-gray-400">User</TableHead>
                  <TableHead className="text-gray-400">Plan</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Usage</TableHead>
                  <TableHead className="text-gray-400">Period</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow
                    key={subscription.id}
                    className="border-gray-700 hover:bg-gray-700/50"
                  >
                    <TableCell>
                      <div className="font-medium text-white">
                        {subscription.user_email}
                      </div>
                      <div className="text-sm text-gray-400">
                        User ID: {subscription.user_id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPlanIcon(subscription.plan_name)}
                        <span className="text-white capitalize">
                          {subscription.plan_name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        ${subscription.price}/month
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                    <TableCell>
                      <div className="text-white">
                        {subscription.images_used}/{subscription.image_limit}{" "}
                        scans
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (subscription.images_used /
                                subscription.image_limit) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-400">
                        Until{" "}
                        {new Date(
                          subscription.current_period_end
                        ).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-400 h-8 w-8 p-0"
                          onClick={() => handleResetUsage(subscription.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-400 h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredSubscriptions.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No subscriptions found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plans Management */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Subscription Plans
            </h2>
            <CreatePlanDialog onCreate={handleCreatePlan} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onUpdate={handleUpdatePlan}
                onDelete={handleDeletePlan}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Plan Card Component
function PlanCard({ plan, onUpdate, onDelete }) {
  const { toast } = useToast();

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this plan? This action cannot be undone."
      )
    ) {
      onDelete(plan.id);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white capitalize">
              {plan.name}
            </h3>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              ${plan.price}
              <span className="text-sm text-gray-400 font-normal">/month</span>
            </p>
          </div>
          <div className="flex gap-2">
            <EditPlanDialog plan={plan} onUpdate={onUpdate} />
            <Button
              variant="outline"
              size="sm"
              className="border-rose-600 text-rose-400 hover:bg-rose-600/10 h-8 w-8 p-0"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Scans included:</span>
            <span className="text-white">{plan.image_limit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Status:</span>
            <Badge
              className={
                plan.is_active
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-gray-500/20 text-gray-400"
              }
            >
              {plan.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <p className="text-gray-400 text-sm">{plan.description}</p>
      </CardContent>
    </Card>
  );
}

// Create Plan Dialog Component
function CreatePlanDialog({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image_limit: "",
    description: "",
    is_active: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...formData,
      price: parseFloat(formData.price),
      image_limit: parseInt(formData.image_limit),
    });
    setOpen(false);
    setFormData({
      name: "",
      price: "",
      image_limit: "",
      description: "",
      is_active: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          New Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Plan Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Image Limit</label>
              <Input
                type="number"
                value={formData.image_limit}
                onChange={(e) =>
                  setFormData({ ...formData, image_limit: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600"
          >
            Create Plan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Edit Plan Dialog Component
function EditPlanDialog({ plan, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(plan);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(plan.id, {
      ...formData,
      price: parseFloat(formData.price),
      image_limit: parseInt(formData.image_limit),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-400 h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Plan Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Image Limit</label>
              <Input
                type="number"
                value={formData.image_limit}
                onChange={(e) =>
                  setFormData({ ...formData, image_limit: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="rounded border-gray-600 bg-gray-700"
            />
            <label className="text-sm text-gray-400">Active Plan</label>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600"
          >
            Update Plan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
