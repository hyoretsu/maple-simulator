import Button from '@components/Button';
import Window from '@components/Window';

import { useCharInfo } from '@context/char';

import Arrow from '@assets/Arrow.svg';

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
                        <Slot background="#a98">Ring</Slot>
                        <Slot background="#a98">Ring</Slot>
                        <Slot background="#a98">Ring</Slot>
                        <Slot background="#a98">Ring</Slot>
                        <Slot background="#999">Pocket</Slot>
                        <Slot background="#999">Book</Slot>
                    </div>
                    <div>
                        <Slot />
                        <Slot background="#8ab">
                            Pendant
                            <br />
                            <span>©</span>
                        </Slot>
                        <Slot background="#8ab">Pendant</Slot>
                        <Slot background="#666">Weapon</Slot>
                        <Slot background="#999">Belt</Slot>
                        <Slot />
                    </div>
                    <div>
                        <Slot background="#999">Hat</Slot>
                        <Slot background="#999">Face</Slot>
                        <Slot background="#999">
                            Eye
                            <br />
                            Acc
                        </Slot>
                        <Slot background="#999">Top</Slot>
                        <Slot background="#999">Bottom</Slot>
                        <Slot background="#999">Shoes</Slot>
                    </div>
                    <div>
                        <Slot />
                        <Slot />
                        <Slot background="#999">
                            Ear
                            <br />
                            Acc
                        </Slot>
                        <Slot background="#999" style={{ fontSize: '0.4em' }}>
                            Shoulder
                        </Slot>
                        <Slot background="#999">Gloves</Slot>
                        <Slot background="#889">Android</Slot>
                    </div>
                    <div>
                        <Slot background="#8ab">Emblem</Slot>
                        <Slot background="#8ab">Badge</Slot>
                        <Slot background="#8ab">Medal</Slot>
                        <Slot background="#666">
                            Sub
                            <br />
                            Weapon
                        </Slot>
                        <Slot background="#999">Cape</Slot>
                        <Slot background="#889">Heart</Slot>
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
