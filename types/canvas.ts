export enum CanvasMode {
  NONE,
  PRESSING,
  SELECTION_NET,
  TRANSLATION,
  INSERTING,
  RESIZING,
  PENCIL,
}

export enum LayerType {
  RECTANGLE,
  ELLIPSE,
  PATH,
  TEXT,
  NOTE,
}

export type Color = {
  r: number;
  g: number;
  b: number;
};

export type BaseLayer<Type extends LayerType> = {
  type: Type;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type RectangleLayer = BaseLayer<LayerType.RECTANGLE>;

export type EllipseLayer = BaseLayer<LayerType.ELLIPSE>;

export type PathLayer = BaseLayer<LayerType.PATH> & { points: number[][] };

export type TextLayer = BaseLayer<LayerType.TEXT>;

export type NoteLayer = BaseLayer<LayerType.NOTE>;

export type Camera = {
  x: number;
  y: number;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  TOP = 1,
  BOTTOM = 2,
  LEFT = 4,
  RIGHT = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.NONE | CanvasMode.PENCIL;
    }
  | {
      mode: CanvasMode.SELECTION_NET;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.TRANSLATION;
      current: Point;
    }
  | {
      mode: CanvasMode.INSERTING;
      layerType:
        | LayerType.ELLIPSE
        | LayerType.RECTANGLE
        | LayerType.TEXT
        | LayerType.NOTE;
    }
  | {
      mode: CanvasMode.PRESSING;
      origin: Point;
    }
  | {
      mode: CanvasMode.RESIZING;
      initialBounds: XYWH;
      corner: Side;
    };
