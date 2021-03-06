﻿angular.module('Lesson')
    .controller('LessonNewsCtrl', [
        '$scope',
        'LabelService',
        'lessonNewsData',
        'LessonService',
        '$state',
        function (
            $scope,
            LabelService,
            lessonNewsData,
            LessonService,
            $state
            ) {
            //-------- $scope properties ----
            $scope.labels;
            $scope.lessons;
            $scope.totalLessons;
            $scope.currentPage;
            $scope.pageSize;

            //-------- private method -------
            _getLabel = function (label) {
                return LabelService.get('LessonNewsCtrl', label);
            }
            _setPageData = function (lessonsPage) {
                $scope.lessons = lessonsPage.lessons;
                $scope.totalLessons = lessonsPage.count
                $scope.currentPage = (lessonsPage.startRow - lessonsPage.startRow % lessonsPage.pageSize) / lessonsPage.pageSize + 1
                $scope.pageSize = lessonsPage.pageSize
            }
            //-------- public method -------
            // Invoke search service for paging through state transition to preserve paging history
            // the state transition is forced cause the same params could be used in previous navigations
            $scope.getPage = function (pager) {
                $state.go('lessonSearch', LessonService.getPage(pager), { reload: true })               
            }

            //--------- model initialization ------
            $scope.labels = {
                publishedOn: _getLabel('publishedOn'),
                viewMore: _getLabel('viewMore'),
                noLessonFound: _getLabel('noLessonFound'),
            };

            _setPageData(lessonNewsData)
        }
    ]);
