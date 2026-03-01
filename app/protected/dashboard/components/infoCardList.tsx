import { CustomCard } from "@/components/molecules/customcard";
import { LucideIcon } from "lucide-react";

type Item = {
  type: string;
  data: string | number;
  info: string;
  icon: LucideIcon;
};

type Props = {
  itemList: Item[];
};

export const InfoCardList = ({ itemList }: Props) => {
  return (
    <>
      {itemList.map((item, index) => (
        <CustomCard
          key={index}
          title={item.type}
          footerInfo={item.info}
          headerIcon={item.icon}
        >
          {item.data}
        </CustomCard>
      ))}
    </>
  );
};
