import React from "react";

import Box from "@mui/material/Box";

import { GeoDataMapLegendClass } from "../../Models/GeoData";

interface IProps {
    legend: GeoDataMapLegendClass[];
}
export const Legend: React.FC<IProps> = ({ legend }) => {
    return (
        <Box>
            {legend
                .filter(({ hide }) => !hide)
                .map((cls, idx) => (
                    <Box key={idx} display="flex" gap={1}>
                        <Box
                            width={20}
                            height={20}
                            sx={{ backgroundColor: cls.color }}
                        />
                        <span>{cls.display_label.en}</span>
                    </Box>
                ))}
        </Box>
    );
};
