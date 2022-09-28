import Image from 'next/image';

import Button from '@components/Button';
import Window from '@components/Window';

import { useCharInfo } from '@context/char';

import Arrow from '@assets/Arrow.svg';
import data from '@public/data.json';

import {
    Background,
    BottomSection,
    EquipSlots,
    ExtraButtons,
    MiscButtons,
    Slot,
    Tab,
    TopBar,
} from './styles';

const EquipmentInventory: React.FC = () => {
    const { job } = useCharInfo();

    return (
        <Window title="Equipment Inventory" size={[232, 354]}>
            <Background job={job}>
                <TopBar>
                    <Tab active>Equip</Tab>
                    <Tab>Cash</Tab>
                    <Tab>Pet</Tab>
                    <Tab>Ad</Tab>
                </TopBar>
                <EquipSlots>
                    <div>
                        <Slot background="#a98">
                            <span>Ring</span>
                            <Image />
                        </Slot>
                        <Slot background="#a98">
                            <span>Ring</span>
                            <Image />
                        </Slot>
                        <Slot background="#a98">
                            <span>Ring</span>
                            <Image />
                        </Slot>
                        <Slot background="#a98">
                            <span>Ring</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Pocket</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Book</span>
                            <Image
                                src="/images/equips/1172000.png"
                                alt="Book"
                                width={data.equips['1172000'].width}
                                height={data.equips['1172000'].height}
                            />
                        </Slot>
                    </div>
                    <div>
                        <Slot />
                        <Slot background="#8ab">
                            <span>Pendant</span>
                            <br />
                            <span style={{ fontSize: '0.85em' }}>©</span>
                            <Image />
                        </Slot>
                        <Slot background="#8ab">
                            <span>Pendant</span>
                            <Image />
                        </Slot>
                        <Slot background="#666">
                            <span>Weapon</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Belt</span>
                            <Image />
                        </Slot>
                        <Slot />
                    </div>
                    <div>
                        <Slot background="#999">
                            <span>Hat</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Face</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Eye</span>
                            <br />
                            <span>Acc</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Top</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Bottom</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Shoes</span>
                            <Image />
                        </Slot>
                    </div>
                    <div>
                        <Slot />
                        <Slot />
                        <Slot background="#999">
                            <span>Ear</span>
                            <br />
                            <span>Acc</span>
                            <Image />
                        </Slot>
                        <Slot background="#999" style={{ fontSize: '0.4em' }}>
                            <span>Shoulder</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Gloves</span>
                            <Image />
                        </Slot>
                        <Slot background="#889">
                            <span>Android</span>
                            <Image />
                        </Slot>
                    </div>
                    <div>
                        <Slot background="#8ab">
                            <span>Emblem</span>
                            <Image />
                        </Slot>
                        <Slot background="#8ab">
                            <span>Badge</span>
                            <Image />
                        </Slot>
                        <Slot background="#8ab">
                            <span>Medal</span>
                            <Image />
                        </Slot>
                        <Slot background="#666">
                            <span>Sub</span>
                            <br />
                            <span>Weapon</span>
                            <Image />
                        </Slot>
                        <Slot background="#999">
                            <span>Cape</span>
                            <Image />
                        </Slot>
                        <Slot background="#889">
                            <span>Heart</span>
                            <Image />
                        </Slot>
                    </div>
                </EquipSlots>
                <BottomSection>
                    <ExtraButtons>
                        <Button
                            border="#5f91a8"
                            colors={['#33ddff', '#1199cc']}
                            size={[49, 13]}
                            style={{ marginRight: 'auto' }}
                        >
                            <Arrow style={{ transform: 'rotate(-90deg)' }} />
                            <span>Weapon</span>
                        </Button>
                        <Button
                            border="#5f91a8"
                            colors={['#33ddff', '#1199cc']}
                            size={[55, 13]}
                            style={{ marginRight: 2 }}
                        >
                            <span>Sacred</span>
                            <Arrow style={{ transform: 'rotate(90deg)' }} />
                        </Button>
                        <Button border="#5f91a8" colors={['#33ddff', '#1199cc']} size={[47, 13]}>
                            <span>Arcane</span>
                            <Arrow style={{ transform: 'rotate(90deg)' }} />
                        </Button>
                    </ExtraButtons>
                    <MiscButtons>
                        <Button border="#e79148" colors={['#ffd556', '#ee930f']} size={[55, 16]}>
                            <span>Effect</span>
                        </Button>
                        <Button
                            border="#e79148"
                            colors={['#ffd556', '#ee930f']}
                            size={[55, 16]}
                            style={{ marginLeft: 2 }}
                        >
                            <span>Salon</span>
                        </Button>
                        <Button
                            border="#e79148"
                            colors={['#ffd556', '#ee930f']}
                            size={[55, 16]}
                            style={{ marginLeft: 'auto' }}
                        >
                            <span>Vessel</span>
                        </Button>
                    </MiscButtons>
                </BottomSection>
            </Background>
        </Window>
    );
};

export default EquipmentInventory;
