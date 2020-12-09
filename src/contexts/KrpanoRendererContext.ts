import React from 'react';
import KrpanoActionProxy from '../KrpanoActionProxy';

export const KrpanoRendererContext = React.createContext<KrpanoActionProxy | null>(null);
