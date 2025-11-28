import SmoothScroll from './components/SmoothScroll';
import BirthdayHero from './components/BirthdayHero';
import Gallery from './components/Gallery';
import BirthdayBook from './components/BirthdayBook';
import MovingGallery from './components/MovingGallery';
import LoveTimeline from './components/LoveTimeline';
import VideoSection from './components/VideoSection';
import ProposalScene from './components/ProposalScene';
import Message from './components/Message';
import GiftBox from './components/GiftBox';
import BackgroundAudio from './components/BackgroundAudio';

function App() {
  return (
    <SmoothScroll>
      <main className="bg-white min-h-screen text-zinc-900 selection:bg-pink-200 selection:text-pink-900">
        {/* Background Audio - Add your audio file path here */}
        <BackgroundAudio src="background.mp3" autoPlay={true} />

        <BirthdayHero />
        <Gallery />
        <BirthdayBook />
        <MovingGallery />
        <LoveTimeline />
        <VideoSection />
        <ProposalScene />
        <GiftBox />
        <Message />

        <footer className="py-8 text-center text-zinc-400 text-sm bg-zinc-50">
          <p>Made with ❤️ for you</p>
        </footer>
      </main>
    </SmoothScroll>
  );
}

export default App;
