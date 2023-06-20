type FooterButtonProps = {
  children: any
  onClick?: any
  className?: string
}

export function FooterButton({
  onClick,
  children,
  className,
}: FooterButtonProps) {
  return (
    <button
      style={{ width: 'calc(100% + 20px)' }}
      className={`${className} px-1`}
      onClick={onClick !== undefined ? onClick : null}
    >
      {children}
    </button>
  )
}
