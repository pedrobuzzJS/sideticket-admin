import { createFileRoute } from '@tanstack/react-router'
import {DynaicIcon, Icons} from "../../icons.tsx";

export const Route = createFileRoute('/list/icon')({
  component: RouteComponent,
})
function RouteComponent() {
  return (
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
      }}>
          {Object.keys(Icons).map(key => (
              <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
              }}>
                  <span>{key}</span>
                  <DynaicIcon name={key as keyof typeof Icons} color={"#11a9ed"} fontSize={200} />
              </div>
          ))}
      </div>
  );
}
