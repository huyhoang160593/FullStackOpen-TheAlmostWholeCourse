interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  return <h1>{name}</h1>;
}
