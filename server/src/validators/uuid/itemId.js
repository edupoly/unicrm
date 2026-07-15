import { z } from "zod";
import { REQUIRED_ITEM_ID, INVALID_ITEM_ID } from "../../errors/uuid/itemId.js";

const itemIdValidator = z
    .string(REQUIRED_ITEM_ID)
    .uuid(INVALID_ITEM_ID);

export default itemIdValidator;
