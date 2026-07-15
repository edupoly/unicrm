import { z } from "zod";
import { ITEM_TYPE_PRODUCT, ITEM_TYPE_SERVICE } from "../../../constants/items.js";
import { INVALID_ITEM_TYPE } from "../../../errors/items/itemType.js";

const itemTypeValidator = z
    .enum([ITEM_TYPE_PRODUCT, ITEM_TYPE_SERVICE], INVALID_ITEM_TYPE);

export default itemTypeValidator;
