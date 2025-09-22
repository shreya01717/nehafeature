declare namespace JSX {
  interface IntrinsicElements {
    "a-scene": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      embedded?: boolean | string;
      arjs?: string | Record<string, any>;
    };
    "a-marker": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      preset?: string;
      type?: string;
      url?: string;
    };
    "a-plane": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      position?: string;
      rotation?: string;
      width?: string | number;
      height?: string | number;
      color?: string;
      opacity?: string | number;
    };
    "a-box": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      position?: string;
      depth?: string | number;
      height?: string | number;
      width?: string | number;
      color?: string;
    };
    "a-entity": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      camera?: boolean | string;
      position?: string;
      rotation?: string;
    };
  }
}
