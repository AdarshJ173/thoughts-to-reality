import * as React from "react";
import { FlatList as RNFlatList, type FlatListProps as RNFlatListProps } from "react-native";
import { cn } from "./utils/cn";

export interface FlatListProps<ItemT> extends RNFlatListProps<ItemT> {
  className?: string;
  contentContainerClassName?: string;
}

export const FlatList = React.forwardRef(function FlatList<ItemT>(
  props: FlatListProps<ItemT>,
  ref: React.Ref<RNFlatList<ItemT>>
) {
  const { 
    className, 
    contentContainerClassName,
    contentContainerStyle,
    style,
    ...rest 
  } = props;

  return (
    <RNFlatList
      ref={ref}
      className={cn(className)}
      contentContainerClassName={cn(contentContainerClassName)}
      contentContainerStyle={contentContainerStyle}
      style={style}
      {...rest}
    />
  );
}) as <ItemT = any>(
  props: FlatListProps<ItemT> & React.RefAttributes<RNFlatList<ItemT>>
) => React.ReactElement;