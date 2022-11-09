const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const slideList = Array.from({ length: 5 }).map((_, i) => {
  return {
    id: i.toString(),
    image: `https://picsum.photos/1440/2842?random=${i}`,
  };
});

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = slideList.length;
  const flatListRef = useRef();

  const renderItem = ({ item }) => {
    const arr = Object.values( item );
    return (
      <View style={styles.imagesContainer}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
    );
  }

  const goNextSlide = () => {
    setCurrent(current < length -1 ? current + 1 : 0);
    flatListRef.current.scrollToIndex({ index: current, animated: true });
  };
  const goPrevSlide = () => {
    setCurrent(current <= length - 1 && current >= 0 ? current -1 : 0);
    flatListRef.current.scrollToIndex({ index: current, animated: true });
  };

  console.log(current)

  return (
    <View style={styles.screen}>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlleft} onPress={goPrevSlide}>
          <CarouselLeftArrow style={styles.leftArrow} size={28} fill='black' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlRight} onPress={goNextSlide}>
          <CarouselRightArrow style={styles.rightArrow} size={28} fill='black' />
        </TouchableOpacity>
      </View>
      <FlatList
        data={slideList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        ref={flatListRef}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imagesContainer: {
    width: windowWidth,
    height: 250
  },
  image: {
    width: '100%',
    height: '100%'
  },
  controls: {
    backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    top: 100
  },
  controlLeft: {

  },
  controlRight: {

  }
})

export default Carousel;