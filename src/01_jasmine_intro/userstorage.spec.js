describe('User storage as global function', function () {

  var userStorage;

  beforeEach(function () {
    userStorage = new UserStorage();
  });

  describe('basic CRUD operations', function () {

    it('should allow adding and querying users', function () {
      var user = userStorage.save({
        name: 'Pawel'
      });

      expect(userStorage.getById(user.id).name).toEqual('Pawel');
    });

    it('should support removing users by id', function () {

      // setup
      userStorage.save({id: '1', value: 'foo'});
      userStorage.save({id: '2', value: 'bar'});

      // stimulus
      var removed = userStorage.remove('1');

      // verify expectations
      expect(removed.value).toEqual('foo');
      expect(userStorage.getById('1')).toBeFalsy();
      expect(userStorage.getById('2').value).toEqual('bar');
    });

  });

  describe('corner cases', function () {

    it('should return null for non existing users', function () {
      expect(userStorage.getById('foo')).toBeNull();
    });

  });

});