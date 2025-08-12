declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<any, any, any>;
  export default component;
}
declare module "virtual:svg-icons-register" {
  const content: any;
  export default content;
}
