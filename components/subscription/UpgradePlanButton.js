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
        className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white ${className}`}
      >
        {showIcon && <Crown className="h-4 w-4 mr-2" />}
        {children}
      </Button>
    </Link>
  );
}
//     <Button
//       onClick={onClick}
//       variant={variant}
//       size={size}
//       className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white ${className}`}
//     >
//       {showIcon && <ArrowUp className="h-4 w-4 mr-2" />}
//       {children}
//     </Button>
//   );
// }
