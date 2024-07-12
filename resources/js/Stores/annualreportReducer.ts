import { Annualreport } from "../Models";
import jsondiff from "../Utils/jsondiff";

import { AnnualreportAction } from "./actions";

import { AnnualreportType } from "@/Config";

const highlightReducer = <T extends AnnualreportType>(
    annualreport: Annualreport<T>,
    action: AnnualreportAction
): Annualreport<T> => {
    let result = undefined;
    if (action.type === "patch") {
        result = { ...annualreport, [action.field]: action.value };
    } else if (action.type === "annualreport_reset") {
        result = action.annualreport;
    } else {
        console.warn("invalid reducer action", action);
        result = annualreport;
    }
    // check for changes
    return jsondiff.diff(result, annualreport) ? result : annualreport;
};

export default highlightReducer;
