import { Document, Schema, Types } from 'mongoose';
import mainDBConnection from '../../config/connection/main-db';

export interface IPublicEventsModel extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    isActive: boolean;
    created: Date;
    startDate: Date;
    endDate: Date;
    color: EventCardColor;
    roundedCorner: CardRoundedCorner;
    size: Size;
    progress: number;
}

export enum CardRoundedCorner {
    TopLeft = 'top left',
    TopRight= 'top right',
    BottomRight = 'bottom right',
    BottomLeft = 'bottom left'
}

export enum EventCardColor {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    ImportantRole = 'important-role'
}
export enum Size {
    S = 'small',
    L = 'large'
}

const publicEventsSchema: Schema = new Schema(
    {
        title: {
            type: Schema.Types.String,
            default: null,
        },
        description: {
            type: Schema.Types.String,
            default: null,
        },
        isActive: {
            type: Schema.Types.Boolean,
            default: null,
        },
        created: {
            type: Schema.Types.Date,
            default: null,
        },
        startDate: {
            type: Schema.Types.Date,
            default: null,
        },
        endDate: {
            type: Schema.Types.Date,
            default: null,
        },
        color: {
            type: Schema.Types.String,
            default: EventCardColor.Primary
        },
        roundedCorner: {
            type: Schema.Types.String,
            default: CardRoundedCorner.TopLeft
        },
        size: {
            type: Schema.Types.String,
            default: Size.S
        },
        progress: {
            type: Schema.Types.Number,
            default: null
        }
    },
    {
        collection: 'events',
    }
);

export default mainDBConnection.model<IPublicEventsModel>('PublicEventsModel', publicEventsSchema);
