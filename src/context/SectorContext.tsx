import * as React from 'react';

export enum SECTOR {
    SP500,
    TECHNOLOGY,
}

export interface SectorContextType {
    sector: SECTOR,
    onSectorChange?: any
}

export const SectorContext = React.createContext<SectorContextType>({
    sector: SECTOR.TECHNOLOGY
});
