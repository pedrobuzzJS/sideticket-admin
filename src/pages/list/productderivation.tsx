import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/list/productderivation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/list/productderivation"!</div>
}
