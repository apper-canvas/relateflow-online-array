import React from 'react'
      import FeatureHeader from '../organisms/FeatureHeader'
      import SearchAndSortBar from '../molecules/SearchAndSortBar'
      import EntityTable from '../organisms/EntityTable'
      import PipelineBoard from '../organisms/PipelineBoard'
      import FeatureModal from '../organisms/FeatureModal'

      const MainFeatureTemplate = ({
        view,
        data,
        loading,
        error,
        searchTerm,
        onSearchChange,
        sortField,
        onSortFieldChange,
        sortDirection,
        onSortDirectionToggle,
        sortOptions,
        onAddClick,
        showModal,
        editingItem,
        formData,
        setFormData,
        handleSubmit,
        resetForm,
        dealStages,
        activityTypes,
        handleDelete,
        handleEdit,
        handleStageChange
      }) => {
return (
          <div className="space-y-6">
            {/* Header */}
            <FeatureHeader
              title={view}
              description={`Manage your ${view} effectively`}
              onAddClick={onAddClick}
              addButtonLabel={`Add ${view.slice(0, -1)}`}
            />

            {/* Search and Filters */}
            <SearchAndSortBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              sortField={sortField}
              onSortFieldChange={onSortFieldChange}
              sortDirection={sortDirection}
              onSortDirectionToggle={onSortDirectionToggle}
              sortOptions={sortOptions}
              view={view}
            />

            {/* Content */}
            {view === 'deals' ? (
              <PipelineBoard
                data={data}
                dealStages={dealStages}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                onAddClick={onAddClick}
              />
            ) : (
              <EntityTable
                data={data}
                view={view}
                dealStages={dealStages}
                handleStageChange={handleStageChange}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                onAddClick={onAddClick}
              />
            )}

            {/* Modal */}
            <FeatureModal
              showModal={showModal}
              view={view}
              editingItem={editingItem}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              resetForm={resetForm}
              dealStages={dealStages}
              activityTypes={activityTypes}
            />
          </div>
        )
      }

      export default MainFeatureTemplate