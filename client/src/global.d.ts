// react-files
declare module "react-files" {
  function Files(props: {
    className?: string;
    onChange?: (e: any) => void;
    onError?: (e: any) => void;
    accepts: string[];
    multiple?: boolean;
    maxFileSize?: number;
    minFileSize?: number;
    clickable?: boolean;
    style?: React.CSSProperties;
  }): JSX.Element;
  export default Files;
}
