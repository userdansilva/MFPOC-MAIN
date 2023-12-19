export const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="max-w-screen-md mx-auto">
    {children}
  </div>
)

/** types */
type ContainerProps = {
  children: React.ReactNode;
}