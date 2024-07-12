import React, { ReactNode, useEffect, useMemo, useState } from "react";

import { ButtonProps } from "@mui/material/Button";
import route from "ziggy-js";

import { IFilterProps } from "../../Models/Inertia";
import Item from "../../Models/Item";
import { IMenuOption } from "../General/SimpleMenu";
import Listing, { ListingProvider } from "../Listing";
import { DummyLinkCreator, ImagePicker, ResourceCreator } from "../Resources";
import useDataSource from "../useDataSource";

import Browser from "./Browser";
import {
    AttachmentColumns,
    ContentItemBrowseColumns,
    MenuType,
} from "./ResourcePicker.constants";

import { FilterOption } from "@/Layout/AppBarHeader";

interface IProps {
    onPick: (item: Item, menuOption?: MenuType) => void;
    label?: string;
    buttonIcon?: ReactNode;
    menu: IMenuOption<MenuType>[];
    buttonProps?: ButtonProps;
}
export const ResourcePicker: React.FC<IProps> = ({
    onPick,
    label,
    buttonIcon,
    menu,
    buttonProps,
}) => {
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState<IFilterProps>();
    const [options, setOptions] = useState<MenuType[]>();
    const [isBrowsing, setIsBrowsing] = useState(false);
    const [dialogTitle, setDialogTitle] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);

    const dataSource = useDataSource<Item>({
        mode: "xhr",
        filter,
        search,
        sort: "-created_at",
        pageSize: 42,
        xhrUrl: filter ? route("admin.resourceitems.index") : undefined,
    });

    const onCreated = (item: Item) => {
        setIsOpen(false);
        onPick(item, options?.length ? options[0] : undefined);
    };

    useEffect(() => {
        if (!options || options.length === 0) {
            setFilter(undefined);
            setIsOpen(false);
            return;
        }
        if (options.length > 1) {
            console.warn("options > 1", options);
        }
        setIsOpen(true);
        switch (options[0]) {
            case "image.browse":
                setFilter({
                    filter: {
                        subtype: "image,image.icon,image.square,image.portrait",
                    },
                });
                setIsBrowsing(true);
                break;
            case "resource.browse":
            case "video.browse":
            case "link.browse":
            case "file.browse":
                setFilter({
                    filter: {
                        subtype:
                            options[0] === "resource.browse"
                                ? "link,video,file"
                                : options[0].replace(".browse", ""),
                    },
                });
                setIsBrowsing(true);
                break;
            case "contentitem.browse":
                setFilter({
                    filter: {
                        type: "article,static,library",
                    },
                });
                setIsBrowsing(true);
                break;
            case "dcproject.browse":
                setFilter({
                    filter: {
                        type: "dcproject",
                    },
                });
                setIsBrowsing(true);
                break;
            default:
                setIsBrowsing(false);
        }
        setDialogTitle(menu.find(({ value }) => value === options[0])?.label);
    }, [options, menu]);

    useEffect(() => {
        if (!isOpen) {
            setOptions(undefined);
        }
    }, [isOpen, setOptions]);

    const pickerWide = options?.at(0) === "video" || options?.at(0) === "embed";

    const switchPicker = () => {
        if (!options?.length) {
            return;
        }
        switch (options[0]) {
            case "image.browse":
                return (
                    <ImagePicker
                        dataSource={dataSource}
                        onCancel={() => setIsOpen(false)}
                        onSelect={(item) => {
                            setIsOpen(false);
                            onPick(
                                item,
                                options?.length ? options[0] : undefined
                            );
                        }}
                    />
                );
            case "resource.browse":
            case "video.browse":
            case "link.browse":
            case "file.browse":
                return (
                    <Listing
                        dataSource={dataSource}
                        columns={AttachmentColumns}
                        selectMode="single"
                    />
                );
            case "contentitem.browse":
                return (
                    <Listing
                        dataSource={dataSource}
                        columns={ContentItemBrowseColumns}
                        selectMode="single"
                    />
                );
            case "link":
            case "file":
            case "video":
            case "image":
            case "embed":
                return (
                    <ResourceCreator type={options[0]} onCreated={onCreated} />
                );
            case "link.dummy":
                return <DummyLinkCreator onCreated={onCreated} />;
        }
    };

    const filterOptions = useMemo(() => {
        if (!options || options[0] !== "image.browse") {
            return undefined;
        }
        return [
            {
                label: "Portrait images",
                name: "subtype",
                value: "image.portrait",
            },
        ] satisfies FilterOption[];
    }, [options]);

    return (
        <Browser<MenuType>
            onSearch={isBrowsing ? setSearch : undefined}
            onSelect={setOptions}
            onClose={() => setIsOpen(false)}
            label={label}
            buttonIcon={buttonIcon}
            dialog={{
                title: dialogTitle,
                wide: isBrowsing || pickerWide,
                tall: isBrowsing,
            }}
            options={menu}
            open={isOpen}
            buttonProps={buttonProps}
            filterOptions={filterOptions}
            onChangeFilter={setFilter}
        >
            <ListingProvider
                onSelect={(row) => {
                    setIsOpen(false);
                    onPick(
                        row as Item,
                        options?.length ? options[0] : undefined
                    );
                }}
                onCancel={() => setIsOpen(false)}
            >
                {switchPicker()}
            </ListingProvider>
        </Browser>
    );
};

export default ResourcePicker;
