import { useEffect, useRef } from "react";

function useChatScroll(dep: any) {
	const ref = useRef<HTMLElement>(); // create ref to reference the chat container element

	useEffect(() => {
        
		setTimeout(() => {
			if (ref.current) {
				ref.current.scrollTop = ref.current.scrollHeight; // Scroll to the bottom of the container
			}
		}, 100);
	}, [dep]);

	return ref;
}

export default useChatScroll;