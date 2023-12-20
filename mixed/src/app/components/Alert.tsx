export const Alert: React.FC<AlertProps> = ({ children }) => (
  <div className="bg-amber-500 p-3 text-sm text-center">
    {children}
  </div>
)

/** types */
type AlertProps = {
  children: React.ReactNode;
}