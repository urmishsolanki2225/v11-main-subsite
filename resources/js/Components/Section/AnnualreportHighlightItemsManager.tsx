import React, { useMemo, useState } from "react";

import { Button, FormControlLabel, Switch, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

import { ItemBrowser, ResourcePicker, ResourcesMenu } from "../Browser";
import { Confirm } from "../General/Confirm";
import Sorter from "../Sorter";
import ItemSorterRenderer from "../Sorter/ItemSorterRenderer";

import { Annualreport, IFilterProps, Item } from "@/Models";

interface IProps {
    annualreport: Annualreport<"highlight">;
    onChange: (items: Item[], message?: string) => void;
}

const AnnualreportHighlightItemsManager: React.FC<IProps> = ({
    annualreport,
    onChange,
}) => {
    const items = annualreport.items;
    const [enablePeriodFilter, setEnablePeriodFilter] = useState(true);

    const onSortByDate = () => {
        onChange(
            items.toSorted((a, b) => a.publish_at.localeCompare(b.publish_at))
        );
    };

    const onAdd = (item: Item) => {
        if (items.find(({ id }) => item.id === id)) {
            return;
        }
        onChange([...items, item]);
    };

    const periodFilter = useMemo(() => {
        const ym = dayjs()
            .set("date", 15)
            .set("year", annualreport.year)
            .set("month", annualreport.month - 1);
        return {
            filter: {
                published_before: enablePeriodFilter
                    ? ym
                          .endOf("month")
                          .utc()
                          .format("YYYY-MM-DDTHH:mm:00.000[Z]")
                    : undefined,
                published_after: enablePeriodFilter
                    ? ym
                          .startOf("month")
                          .utc()
                          .format("YYYY-MM-DDTHH:mm:00.000[Z]")
                    : undefined,
            },
        } satisfies IFilterProps;
    }, [annualreport.month, annualreport.year, enablePeriodFilter]);

    return (
        <>
            <Box display="flex" justifyContent="space-between" gap={1} mb={1}>
                <ItemBrowser
                    onPick={onAdd}
                    sort="publish_at"
                    browserProps={{
                        label: "Browse for item",
                        buttonProps: {
                            color: "primary",
                            variant: "contained",
                        },
                    }}
                    filter={periodFilter}
                    extraFilter={
                        <FormControlLabel
                            label={
                                <Box display="flex" flexDirection="column">
                                    <Typography>Publish period</Typography>
                                    <Typography variant="caption">
                                        {enablePeriodFilter ? (
                                            <>{`Only ${dayjs()
                                                .set("date", 1)
                                                .set(
                                                    "month",
                                                    annualreport.month - 1
                                                )
                                                .set("year", annualreport.year)
                                                .format("MMM YYYY")}
                                    `}</>
                                        ) : (
                                            "Any date"
                                        )}
                                    </Typography>
                                </Box>
                            }
                            control={
                                <Switch
                                    checked={enablePeriodFilter}
                                    onChange={(evt, checked) =>
                                        setEnablePeriodFilter(checked)
                                    }
                                    //@ts-expect-error: "Make it look ok"
                                    color="white"
                                />
                            }
                        />
                    }
                />
                <ResourcePicker
                    label="Create resource item"
                    menu={ResourcesMenu}
                    onPick={onAdd}
                    buttonProps={{ color: "primary" }}
                />
                <Confirm
                    confirmText="The existing ordering will be reset."
                    onConfirm={() => {
                        onSortByDate();
                    }}
                >
                    <Button size="small">Sort by date</Button>
                </Confirm>
            </Box>
            <Box
                sx={{ maxHeight: 500, overflowY: "auto", overflowX: "hidden" }}
            >
                {items.length === 0 ? (
                    <Typography>No related items</Typography>
                ) : (
                    <Sorter
                        items={items}
                        onChange={onChange}
                        variant="column"
                        Renderer={ItemSorterRenderer}
                    />
                )}
            </Box>
        </>
    );
};

export default AnnualreportHighlightItemsManager;
