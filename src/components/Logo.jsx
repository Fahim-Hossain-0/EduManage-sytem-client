import logoImg from '../assets/high-resolution-logo-grayscale.png';

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <img className="h-8 w-auto" src={logoImg} alt="EduManage" />
        </div>
    );
};

export default Logo;
