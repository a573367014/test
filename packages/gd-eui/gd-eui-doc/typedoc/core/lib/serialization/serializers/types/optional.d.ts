import { OptionalType } from "../../../models";
import { TypeSerializerComponent } from "../../components";
import type { OptionalType as JSONOptionalType } from "../../schema";
export declare class OptionalTypeSerializer extends TypeSerializerComponent<OptionalType> {
    supports(t: unknown): boolean;
    /**
     * Will be run after {@link TypeSerializer} so `type` will already be set.
     * @param type
     * @param obj
     */
    toObject(type: OptionalType, obj: Pick<JSONOptionalType, "type">): JSONOptionalType;
}
