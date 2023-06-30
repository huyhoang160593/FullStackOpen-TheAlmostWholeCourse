/* eslint-env node */
import MdiFacebook from 'components/svgs/MdiFacebook'
import MdiInstagram from 'components/svgs/MdiInstagram'
import MdiGithub from 'components/svgs/MdiGithub'

export function Footer() {
  return <footer className="footer items-center p-4 bg-base-300 text-base-content mt-20">
    <div className="items-center grid-flow-col">
      <figure><img src={`${process.env.PUBLIC_URL}/puppycat-icon.png`} alt="image of puppycat" className='w-9 h-9' /></figure>
      <p>Copyright © 2023 - All right reserved by The 99&apos;s Puppycat</p>
    </div>
    <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a className='cursor-pointer'><MdiFacebook /></a>
      <a className='cursor-pointer'><MdiInstagram /></a>
      <a className='cursor-pointer'><MdiGithub /></a>
    </div>
  </footer>
}
