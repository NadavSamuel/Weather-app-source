import { useEffect, useState } from "react";

export function useForm(initialState, cb = function () { }) {
    const [fields, setFields] = useState(initialState);

    useEffect(() => { cb(fields) }, [fields])

    return [
        fields,
        function (event) {
            const value = event.target.type === 'number' ? +event.target.value : event.target.value
            setFields({
                ...fields,
                [event.target.name]: value
            });
        },
    ];
}
export function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = event => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
  
          handler(event);
        };
  
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
  
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
  