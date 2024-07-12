import React, {
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { usePage } from "@inertiajs/inertia-react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useThrottleFn } from "react-use";

import { IFilterProps, IListingPageProps, Page } from "../Models/Inertia";

export type FilterOption = {
    label: string;
    name: string;
    value?: string;
    disabledValue?: string;
};

interface IProps {
    title?: string;
    afterTitle?: ReactNode;
    afterSearch?: ReactNode;
    onSearch?: (search: string) => void;
    onChangeFilter?: (filter: IFilterProps) => void;
    filter?: IFilterProps;
    filterOptions?: FilterOption[];
    // filters?: ReactNode | ReactNode[];
    // activeFiltersCount?: number;
    isDialog?: boolean;
    children?: React.ReactNode;
}
export const AppBarHeader: React.FC<IProps> = ({
    title,
    afterTitle,
    afterSearch,
    onSearch,
    onChangeFilter,
    filter: _filter,
    filterOptions = [],
    // activeFiltersCount = 0,
    isDialog = false,
    children,
}) => {
    const theme = useTheme();
    const [filter, setFilter] = useState(_filter);
    const { filter: pageFilter } = usePage<Page<IListingPageProps>>().props;
    const [search, setSearch] = useState(
        filter?.filter?.search ||
            (isDialog ? "" : pageFilter?.filter?.search || "")
    );
    const [filtersAnchorEl, setFiltersAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const addFilter = (name: string, value = "true") => {
        if (filter) {
            updateFilter({ filter: { ...filter.filter, [name]: value } });
        } else {
            updateFilter({ filter: { [name]: value } });
        }
    };
    const removeFilter = (name: string, disabledValue: string | undefined) => {
        if (filter) {
            const newFilter = { ...filter } as IFilterProps;
            if (disabledValue) {
                (newFilter.filter as any)[name] = disabledValue;
            } else {
                delete (newFilter.filter as any)[name];
            }
            updateFilter(newFilter);
        }
    };

    const updateFilter = (newFilter: IFilterProps) => {
        setFilter(newFilter);
        onChangeFilter && onChangeFilter(newFilter);
    };

    useEffect(() => {
        setFilter(_filter);
    }, [_filter]);

    useThrottleFn(
        (search) => {
            if (!onSearch) {
                return;
            }
            if (!search) {
                onSearch("");
            } else if (search.length > 1) {
                onSearch(search);
            }
        },
        500,
        [search]
    );

    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

    const handleKeyDown = useCallback((evt: KeyboardEvent) => {
        if (evt.key === "k" && (evt.metaKey || evt.ctrlKey)) {
            // focus
            searchInputRef.current?.focus();
        }
    }, []);

    useEffect(() => {
        if (onSearch) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onSearch, handleKeyDown]);

    return (
        <AppBar
            position={isDialog ? "relative" : "absolute"}
            sx={{ top: 0, zIndex: theme.zIndex.drawer + 1, color: "white" }}
        >
            <Toolbar sx={{ gap: 2 }}>
                <Box flexGrow={2} display="flex" alignItems="baseline">
                    <Typography variant="h6">{title}</Typography>
                    {afterTitle && (
                        <Typography color="white">{afterTitle}</Typography>
                    )}
                </Box>
                {onSearch && (
                    <Input
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            maxWidth: 180,
                            width: 300,
                            transition: "all 0.4s ease-in-out",

                            "&.Mui-focused": {
                                backgroundColor: "rgba(255,255,255,0.8)",
                                maxWidth: 1000,
                            },
                        }}
                        disableUnderline={true}
                        placeholder={`Search... [${isMac ? "⌘" : "ctrl"}K]`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        inputRef={searchInputRef}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                )}
                {afterSearch && <Box color="white">{afterSearch}</Box>}
                {filterOptions.length > 0 && (
                    <>
                        {/* <Tooltip
                            title="Filters"
                            open={Boolean(!filtersAnchorEl)}
                        > */}
                        <IconButton
                            onClick={(evt) =>
                                setFiltersAnchorEl(evt.currentTarget)
                            }
                            size="large"
                        >
                            <Badge
                                badgeContent={filterOptions.reduce(
                                    (count, { name, disabledValue }) =>
                                        filter?.filter &&
                                        (filter?.filter as any)[name] !==
                                            disabledValue
                                            ? count + 1
                                            : count,
                                    0
                                )}
                                color="secondary"
                            >
                                <FilterListIcon />
                            </Badge>
                        </IconButton>
                        {/* </Tooltip> */}
                        <Menu
                            anchorEl={filtersAnchorEl}
                            keepMounted
                            open={Boolean(filtersAnchorEl)}
                            onClose={() => setFiltersAnchorEl(null)}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            {filterOptions.map(
                                (
                                    { label, name, value, disabledValue },
                                    idx
                                ) => (
                                    <MenuItem key={idx}>
                                        <ListItemText>{label}</ListItemText>
                                        <Switch
                                            edge="end"
                                            color="primary"
                                            checked={Boolean(
                                                filter?.filter &&
                                                    (filter?.filter as any)[
                                                        name
                                                    ] !== disabledValue
                                            )}
                                            onChange={(evt) => {
                                                if (evt.target.checked) {
                                                    addFilter(name, value);
                                                } else {
                                                    removeFilter(
                                                        name,
                                                        disabledValue
                                                    );
                                                }
                                            }}
                                        />
                                    </MenuItem>
                                )
                            )}
                        </Menu>
                    </>
                )}
                {children}
            </Toolbar>
        </AppBar>
    );
};

export default AppBarHeader;
