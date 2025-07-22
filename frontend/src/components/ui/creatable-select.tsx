import { type GroupBase, type Props } from "react-select";
import CreatableSelect from "react-select/creatable";

import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CustomCreatableSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ classNames, ...props }: Props<Option, IsMulti, Group>) {
  return (
    <CreatableSelect
      closeMenuOnSelect={false}
      classNamePrefix="multi-creatable-select"
      classNames={{
        control: ({ isFocused }) =>
          cn("rounded-sm border-1 border-black/15 p-1 shadow-xs", isFocused && "border-active"),
        valueContainer: () => "px-2",
        placeholder: () => "text-muted-foreground",
        multiValue: () => cn(badgeVariants({ variant: "outline" }), "m-0.5"),
        input: () => "m-0.5 py-0.5",
        clearIndicator: ({ isFocused }) =>
          cn(
            "flex p-2 transition-colors text-accent",
            isFocused ? "hover:text-black/80" : "hover:text-black/40",
            isFocused && "text-black/50",
          ),
        dropdownIndicator: ({ isFocused }) =>
          cn(
            "flex p-2 transition-colors text-accent",
            isFocused ? "hover:text-black/80" : "hover:text-black/40",
            isFocused && "text-black/50",
          ),
        indicatorSeparator: () => "bg-accent my-2 w-[1px] self-stretch",
        menu: () => "my-2 rounded-sm border-1 border-black/15 shadow-lg bg-background",
        menuList: () => "py-1",
        option: ({ isFocused }) =>
          cn(buttonVariants({ variant: "ghost" }), "justify-start", isFocused && "bg-accent/30"),
        noOptionsMessage: () => "py-2",
        ...classNames,
      }}
      unstyled
      {...props}
    />
  );
}

export default CustomCreatableSelect;
