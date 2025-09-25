

import { Container } from "./container";

export default function Footer() {
    return (
        <footer className='py-[10px] select-none'>
            <Container>
                <p className="text-[16px] font-medium opacity-50 text-black">© 2025 Some brand name</p>
                { /*<ul className="flex gap-[20px] text-[16px] font-medium opacity-50 text-black mt-1">
                    <li>
                        <Link href="">
                            Shipping policy
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            Privacy policy
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            Terms of service
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            Refund policy
                        </Link>
                    </li>
                </ul>*/ }
            </Container>
        </footer>
    );
}