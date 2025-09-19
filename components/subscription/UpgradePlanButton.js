// components/subscription/UpgradePlanButton.js
import { Button } from "@/components/ui/button";
import { ArrowUp, Crown } from "lucide-react";
import Link from "next/link";

export function UpgradePlanButton({
  variant = "default",
  size = "default",
  className = "",
  onClick,
  showIcon = true,
  children = "Upgrade Plan",
}) {
  return (
    <Link href="/subscription">
      <Button
        variant={variant}
        size={size}
        className={`bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-amber-500/25 ${className}`}
      >
        {showIcon && <Crown className="h-4 w-4 mr-2" />}
        {children}
      </Button>
    </Link>
  );
}
