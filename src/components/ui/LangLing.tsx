import { linkWithLang } from "@lib/utils/helpers";
import { Link as RouterLink, type LinkProps } from "react-router-dom";


interface LangLinkProps extends LinkProps {}

export default function LangLink({ to, ...props }: LangLinkProps) {
  const path = typeof to === "string" ? linkWithLang(to) : to;
  return <RouterLink to={path} {...props} />;
}